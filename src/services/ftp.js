import { Client } from "basic-ftp";
import { basename } from "path"

export async function listarArquivosFTP() {
  const client = new Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS
    });

    return await client.list(process.env.FTP_DIR);
  } catch (error) {
    console.error('Erro ao listar arquivos no FTP:', error);
    return [];
  } finally {
    client.close();
  }
}

export async function enviarParaFTP(arquivo) {
  const client = new Client();
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS
    });

    await client.uploadFrom(arquivo, `${process.env.FTP_DIR}/${basename(arquivo)}`);

  } catch (error) {
    console.error('Erro ao enviar arquivo para o FTP:', error);
  } finally {
    client.close();
  }
}
