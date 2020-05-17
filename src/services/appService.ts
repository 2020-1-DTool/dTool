import {
  clear,
  getPreferences,
  getAuth,
  setAccessCode,
  saveData,
} from './localStorage';
import api from './API';
import { Permission } from './types';

/**
 * Coordena operações complexas da aplicação (principalmente aquelas relacionadas
 * ao fluxo online/offline), de forma a simplificar a implementação das telas do app.
 *
 * Índice de funções:
 * - `startupScreen`: atualiza os dados locais (se possível) e retorna qual deve ser a tela inicial do app
 * - `processAccessCode`: valida um código de acesso e armazena as informações retornadas.
 */

/**
 * Possíveis telas iniciais do app:
 * - `home`: tela de início;
 * - `readCode`: tela para informar código de acesso;
 * - `technology`: tela para selecionar tecnologia.
 */
type Screen = 'home' | 'readCode' | 'technology';

/**
 * Faz as verificações necessárias ao iniciar o app e retorna um código
 * representando a primeira tela a ser exibida quando o app é aberto.
 *
 * Se houver um código de acesso salvo, tenta atualizar os dados locais; se não
 * houver conexão, continua usando os dados que estão presentes localmente.
 *
 * @returns Um código que representa a tela a ser exibida (ver `Screen`).
 */
export const startupScreen = async (): Promise<Screen> => {
  const { code } = await getAuth();

  // se não tiver código de acesso salvo, redirecionar para leitura de código
  if (code === null || code === undefined) {
    return 'readCode';
  }

  // se tiver código de acesso, tentar atualizar informações locais
  try {
    const result = await api.post('/auth', { code });

    // se o request foi feito com sucesso, atualizar dados locais
    await saveData(result.data);

    // verificar permissão e direcionar ao fluxo correspondente
    return firstScreenAfterAppStartup();
  } catch (error) {
    // se for 404, então a instituição foi deletada
    if (error.result?.status === 404) {
      // limpar dados locais e continuar com leitura de código
      await clear();
      return 'readCode';
    }

    // se for um erro de conexão, usar dados locais
    return firstScreenAfterAppStartup();
  }
};

/**
 * Computa a primeira tela a ser exibida quando o app é aberto.
 *
 * Verifica a permissão do código de acesso usado para entrar no app, assim como
 * as preferências salvas localmente (como se há uma tecnologia persistida).
 */
const firstScreenAfterAppStartup = async (): Promise<Screen> => {
  const { permission } = await getAuth();
  if (
    permission === 'administration-app' ||
    permission === 'administration-hospital'
  ) {
    return 'home';
  }

  const { technology } = await getPreferences();
  const hasTechnology = technology !== null && technology !== undefined;

  return hasTechnology ? 'home' : 'technology';
};

/**
 * Verifica a validade de um código de acesso e persiste as informações
 * da instituição relacionada, se for um código válido.
 *
 * @param code Código de acesso à aplicação (quatro caracteres).
 * @returns O nível de permissão do código. Se for um código inválido,
 * lança um erro com a mensagem `'not-found'`; se houver um erro ao validar
 * o código, lança um erro com a mensagem `'network'`.
 */
export const processAccessCode = async (code: string): Promise<Permission> => {
  try {
    const response = await api.post('/auth', { code });

    await setAccessCode(code);
    await saveData(response.data);

    return response.data.permission;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('not-found');
    }

    throw new Error('network');
  }
};
