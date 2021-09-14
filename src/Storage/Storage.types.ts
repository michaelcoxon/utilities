
export interface IStorageRepository<TKey, T>
{
    deleteAsync(key: TKey): Promise<void>;
    getAsync(key: TKey): Promise<T | undefined>;
    setAsync(key: TKey, entity: T): Promise<void>;
}
