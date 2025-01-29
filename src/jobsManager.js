// module.exports is required to use the class outside this file but for some reason it's not working
// Job becomes unidentified
module.exports = class Job {
	constructor(scene_id, description, attachments, attributes, required_roles, deadline, status) {
		this.setSceneId(scene_id);
		this.setDescription(description);
		this.setAttachments(attachments);
		this.setAttributes(attributes);
		this.setRequiredRoles(required_roles);
		this.setDeadline(deadline);
		this.setStatus(status);
	}
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

	// Returns an array with what are correct values for `status` field
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
			// console.log(status);
			// console.log(Job.available_statuses.includes(status))
			this.status = status;


			if (Job.available_statuses.includes(status)) {
				this.status = status;
			}
			else {
				throw new TypeError('Wrong Status');
			}
		}
		catch (error) {
			// This should be made more verbose so the errors will be more helpful
			console.log('Error setting status in a job');
		}
	};


};

console.log(Job.getAvailableStatuses())
