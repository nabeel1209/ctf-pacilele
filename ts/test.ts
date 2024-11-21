type BuildArray<Num extends number, Z extends any[] = []> = Z["length"] extends Num ? Z : BuildArray<Num, [...Z, 0]>
type ToNumber<T extends string> = T extends `${infer C extends number}` ? C : never
type GreaterThan<A extends number, B extends number> = BuildArray<A> extends [...BuildArray<B>, ...infer Rest] ? true : false
type Add<A extends number, B extends number> = [...BuildArray<A>, ...BuildArray<B>]["length"] extends (infer S extends number) ? S : never
type Multip<A extends number, B extends number, C extends number = 0, Z extends number = 0> = C extends B ? Z : Multip<A, B, Add<C, 1>, Add<Z, A>>
type Subtract<A extends number, B extends number> = BuildArray<A> extends [...BuildArray<B>, ...infer Rest] ? Rest["length"] : BuildArray<B> extends [...BuildArray<A>, ...infer Rest] ? ToNumber<`-${Rest["length"]}`> : 0

type Mapping = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25, '0': 26, '1': 27, '2': 28, '3': 29, '4': 30, '5': 31, '6': 32, '7': 33, '8': 34, '9': 35, '{': 36, '_': 37, '}': 38}
type Huh<C extends string> = C extends keyof Mapping ? Mapping[C] : -1
type Merdeka<T extends any[], N extends number, C extends number = 0, I extends number = GreaterThan<Add<C,N>, T["length"]> extends true ? Subtract<Add<C,N>, T["length"]> : Add<C,N>> = C extends T["length"] ? [] : [T[I], ...Merdeka<T, N, Add<1, C>>]
type Join<T extends any[], N extends number, C extends number = 0, I extends number = GreaterThan<Subtract<T["length"],1>, Subtract<Add<C, T["length"]>,N>> extends true ? Subtract<Add<C, T["length"]>,N> : Subtract<C,N>> = C extends T["length"] ? [] : [T[I], ...Join<T, N, Add<1, C>>]
type NetSOS<T extends any[], A extends number, B extends number, C extends number = A> = C extends B ? [] : [T[C], ...NetSOS<T, A, B, Add<C, 1>>]
// @ts-ignore: Never actually infinite
type Something<T extends string, Prev extends number> = T extends `${infer B}${infer Rest}` ? [Add<Huh<B>, Prev>, ...Something<Rest, Huh<B>>] : []

type DoOperation<Z extends number[]> = [
    Join<NetSOS<Z, 0, 12>, 5>,
    Merdeka<NetSOS<Z, 12, 24>, 7>,
    Join<Merdeka<NetSOS<Z, 24, 35>, 9>,4>
]

// @ts-ignore: Never actually infinite
type Mystery<T extends string> = T extends `${infer C}${infer Rest}` ? [Huh<C>, ...DoOperation<Something<Rest, Huh<C>>>] : never

type ExpectedAnswer = [13, [45, 48, 37, 47, 25, 17, 23, 37, 32, 32, 54, 44], [59, 48, 26, 7, 14, 41, 56, 43, 39, 44, 47, 55], [7, 6, 36, 38, 35, 68, 14, 44, 41, 39, 39]]
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false
type Expect<T extends true> = T
type CheckFlag<T extends string> = Equal<Mystery<T>, ExpectedAnswer>
type Answer = Expect<CheckFlag<"YOUR_ANSWER">>
