// module.exports is required to use the class outside this file but for some reason it's not working
// Job becomes unidentified
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


	static available_statuses = [
		{ name: 'Completed', value: 'COMPLETED' },
		{ name: 'In Progress', value: 'IN_PROGRESS' },
		{ name: 'Unassigned', value: 'UNASSIGNED' }];

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

	// Returns an array of Objects with name: and value: pair
	static getAvailableStatuses() {
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

	// For correct values use Job.getAvailableStatuses()
	setStatus(status) {
		try {
			for (const x of Job.available_statuses) {
				if (x.value == status) {
					this.status = status;
				}
			}
			if (this.status == undefined | this.status !== status) {
				throw new TypeError('Wrong Status');
			}
		}
		catch (error) {
			console.log(error + ': Error setting \"' + status + '\" as a status');
		}
	};


};

module.exports = Job;

// console.log(Job.getAvailableStatuses());

// const anime = new Job(1, 1, 1, 1, 1, 1, 'COMPLETED');

// const audio = new Job(1, 1, 1, 1, 1, 1, 'bad stuff');

