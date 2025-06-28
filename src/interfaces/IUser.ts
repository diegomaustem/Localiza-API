export interface IUser {
  id: string;
  nome: string;
  sobrenome: string;
  cpf: bigint;
  rg: bigint;
  email: string;
  senha: string | null;
  endereco: string;
  telefone: string;
  numeroCarteira: bigint;
  tipoCarteira: string;
  criacaoData: Date;
  atualizacaoData: Date;
}
export interface ICreateUser {
  id: string;
  nome: string;
  sobrenome: string;
  cpf: bigint;
  rg: bigint;
  email: string;
  senha: string | null;
  endereco: string;
  telefone: string;
  numeroCarteira: bigint;
  tipoCarteira: string;
}
export interface IUserResponse {
  id: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  rg: string;
  email: string;
  senha: string | null;
  endereco: string;
  telefone: string;
  numeroCarteira: string;
  tipoCarteira: string;
  criacaoData: Date;
  atualizacaoData: Date;
}
