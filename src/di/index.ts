import { IBinding, IProvider, IToken } from "./Types";

export function createToken<T>(debugName: string): IToken<T> {
  return {
    debugName,
    toString: () => debugName,
  };
}
export function createBinding<T>(
  token: IToken<T>,
  provider: IProvider<T>
): IBinding<T> {
  return { token, provider };
}

export default class Injector {
  public bindings = new Map<IToken<any>, IProvider<any>>();
  public cache = new Map<IToken<any>, Promise<any>>();

  constructor(binding: IBinding[]) {
    this.addBingdings(binding);
  }
  public addBingdings(bindings: IBinding[]) {
    for (const binding of bindings) {
      this.addBingding(binding);
    }
  }
  public addBingding(binding: IBinding) {
    this.bindings.set(binding.token, binding.provider);
  }
  public async get<T>(token: IToken<T>): Promise<T> {
    if (this.cache.has(token)) {
      return this.cache.get(token);
    } else {
      const promise = this.provide(token);
      this.cache.set(token, promise);
      return promise;
    }
  }
  private async provide<T>(token: IToken<T>) {
    const provider = this.bindings.get(token);

    if (!provider) {
      throw new Error(`Provider undefined ${token}`);
    }
    const dependencies = await Promise.all(
      provider.dependencyToken.map((t) => this.get(t))
    );
  }
}
