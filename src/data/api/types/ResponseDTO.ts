export type ResponseDTO<T> = {
  content: T,
  pagination: boolean | null,
  code: number,
  message: string
}