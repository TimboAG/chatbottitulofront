import CryptoJS from "crypto-js";

const config = {
  claveSecreta: "sddsdsdsd",
};
const claveSecreta = config.claveSecreta;

const encriptarToken = (texto) => {
  const textoEncriptado = CryptoJS.AES.encrypt(texto, claveSecreta).toString();
  return textoEncriptado;
};

const desencriptarToken = (textoEncriptado) => {
  const textoDesencriptado = CryptoJS.AES.decrypt(
    textoEncriptado,
    claveSecreta
  ).toString(CryptoJS.enc.Utf8);
  return textoDesencriptado;
};

const encriptarUsuario = (usuario) => {
  const usuarioEncriptado = CryptoJS.AES.encrypt(
    JSON.stringify(usuario),
    claveSecreta
  ).toString();
  return usuarioEncriptado;
};

const desencriptarUsuario = (usuarioEncriptado) => {
  const usuarioDesencriptado = CryptoJS.AES.decrypt(
    usuarioEncriptado,
    claveSecreta
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(usuarioDesencriptado);
};

export {
  encriptarToken,
  desencriptarToken,
  encriptarUsuario,
  desencriptarUsuario,
};
