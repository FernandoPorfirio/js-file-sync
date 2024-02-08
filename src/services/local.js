import { readdir } from 'fs/promises';
import { basename } from "path"
import { listarArquivosFTP, enviarParaFTP } from "../services/ftp.js";

export async function verificarArquivosIniciais() {
  try {
    const arquivosIniciais = await readdir(process.env.LOCAL_DIR);
    return arquivosIniciais
  } catch (error) {
  }
}

export async function sincronizarArquivos() {
  const arquivosLocais = await readdir(process.env.LOCAL_DIR);
  const arquivosFTP = await listarArquivosFTP();

  const arquivosAusentesNoFTP = arquivosLocais.filter(arquivo => {
    return !arquivosFTP.find(item => item.name === basename(arquivo));
  });

  for (const arquivo of arquivosAusentesNoFTP) {
    await enviarParaFTP(`${process.env.LOCAL_DIR}/${arquivo}`);
  }
}
