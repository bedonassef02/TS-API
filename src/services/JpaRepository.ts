export interface JpaRepository<T> {
    create(entity: T): Promise<T | null>;

    deleteById(id: number): boolean;

    findAll(): Promise<T[]>;

    findById(id: number): Promise<T | null>;

    update(entity: T): T | null;
}
