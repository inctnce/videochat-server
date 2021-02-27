interface IRepo {
	create(object: any): any;
	readOne(key: any, field: string): any;
	update(id: string, value: any, field: string): any;
	delete(key: any): any;
}

export default IRepo;
