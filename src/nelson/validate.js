export function validate(tab, v) {
  const e = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Digite um e-mail válido.';
  if (tab === 'login' && !v.senha) e.senha = 'Digite sua senha.';
  if (tab === 'cadastro' && v.senha.length < 6) e.senha = 'Mínimo de 6 caracteres.';
  if (tab === 'cadastro' && v.confirma !== v.senha) e.confirma = 'As senhas não coincidem.';
  return e;
}