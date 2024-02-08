import { verificarArquivosIniciais, sincronizarArquivos } from "../services/local.js";

import { iniciarWatcher } from "../services/watcher.js";

export async function espelhoNFE() {
  const arquivosIniciais = await verificarArquivosIniciais()

  await sincronizarArquivos()

  await iniciarWatcher(arquivosIniciais)

}
