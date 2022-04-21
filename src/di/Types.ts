export interface IToken<T> {
  readonly debugName: string;
  readonly surrogate: T;
  readonly toString: () => string;
}

export declare type TupleToToken<T extends readonly any[]> = {
  [i in keyof T]: IToken<i>;
};

export interface IProvider<T, TDeps extends readonly any[] = readonly any[]> {
  dependencyToken: TupleToToken<TDeps>;
  get(dependencies: TDeps): Promise<T>;
}

export interface IBinding<T = unknown> {
  token: IToken<T>;
  provider: IProvider<T>;
}

export interface ClassType<
  TInstace = any,
  TParams extends readonly any[] = readonly any[]
> {
  new (...args: TParams): TInstace;
}
