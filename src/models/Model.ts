import { v1 as uuidv1 } from "uuid";

class Model {
	protected id: string;
	protected creationDate: Date;

	constructor(id?: string, creationDate?: Date) {
		this.id = Model.createId();
		this.creationDate = new Date();

		if (id) {
			this.id = id;
		}

		if (creationDate) {
			this.creationDate = creationDate;
		}
	}

	public static createId(): string {
		return uuidv1();
	}

	public convertDateToMySQLFormat(): string {
		return this.creationDate.toISOString().slice(0, 19).replace("T", " ");
	}

	public Id(): string {
		return this.id;
	}

	public CreationDate(): Date {
		return this.creationDate;
	}
}

export default Model;
