import { basename } from "path"
import { watch } from "chokidar";
import {  enviarParaFTP } from "../services/ftp.js";

export async function iniciarWatcher(arquivosIniciais) {
  const watcher = watch(process.env.LOCAL_DIR, {
    ignored: /[\/\\]\./,
    persistent: true
  });

  await watcher
    .on('add', arquivo => {
      // console.log(basename(arquivo))
      if (!arquivosIniciais.includes(basename(arquivo))) {
        // console.log(`watcher: ${basename(arquivo)}`);
        enviarParaFTP(arquivo);
      }
    })
    .on('change', arquivo => {
      if (!arquivosIniciais.includes(basename(arquivo))) {
        // console.log(`watcher: ${basename(arquivo)}`);
        enviarParaFTP(arquivo);
      }
    });
}

