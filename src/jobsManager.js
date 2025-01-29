class Job {
	constructor(scene_id, description, attachments, attributes, required_roles, deadline, status) {
		this.setSceneId(scene_id);
		this.setDescription(description);
		this.setAttachments(attachments);
		this.setAttributes(attributes);
		this.setRequiredRoles(required_roles);
		this.setDeadline(deadline);
		this.setStatus(status);
	}
	// TODO
	static available_statuses = ['COMPLETED', 'IN_PROGRESS', 'UNASSIGNED'];


	getSceneId() {
		return this.scene_id;
	}
	getDescription() {
		return this.description;
	}

	getAttachments() {
		return this.attachments;
	};

	getAttributes() {
		return this.attributes;
	};

	getRequiredRoles() {
		return this.required_roles;
	};

	getDeadline() {
		return this.deadline;
	};

	getStatus() {
		return this.status;
	};

	// Returns what are correct values for `status` field
	getAvailableStatuses() {
		return this.available_statuses;
	};

	setSceneId(scene_id) {
		this.scene_id = scene_id;
	}
	setDescription(description) {
		this.description = description;
	}

	setAttachments(attachments) {
		this.attachments = attachments;
	};

	setAttributes(attributes) {
		this.attributes = attributes;
	};

	setRequiredRoles(required_roles) {
		this.required_roles = required_roles;
	};

	setDeadline(deadline) {
		this.deadline = deadline;
	};

	setStatus(status) {
		try {
			console.log(status);
			console.log(Job.available_statuses[2] == status)
			// WHY DOES THIS NOT WORK AGHHHHHHHH!!!!!
			// IT DOESN"T WANT TO EXECUTE INSIDE FOR EACH LOOP
			// I AM LOOSING MY MIND
			available_statuses.forEach(element => {
				if (status == element) {
					this.status = status;
					console.log(element);
				}
				console.log(element);
			});
			if (this.status !== status) {
				throw new TypeError('Wrong Status');
			}
		}
		catch (error) {
			console.log('error setting status in a job');
		}
	};


}


const audio = new Job('1','1','1','1','1','1','UNASSIGNED');
console.log(audio.getStatus());
console.log(Job.available_statuses[2])
const animation = new Job('1','1','1','1','1','1','1');