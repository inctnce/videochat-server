interface IRepo {
	create(object: unknown): unknown;
	readOne(key: string, field: string): unknown;
	update(id: string, value: string | null, field: string): unknown;
	delete(key: string): unknown;
}

export default IRepo;
