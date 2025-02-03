// Data format validation should also be done here.
const fs = require('node:fs');
const { stringify } = require('csv/sync');
const chrono = require('chrono-node');
const discord = require('discord.js');

if (!fs.existsSync('jobs.v0.csv')) {
	fs.appendFileSync(
		'jobs.v0.csv',
		'SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work\n',
	);
}

class Job {
	// What if we want to edit only one value?
	constructor(scene_id, description = null, attachments = null, attributes = null, required_roles = null, deadline = null, status = null) {
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
		{ name: 'Unassigned', value: 'UNASSIGNED' },
	];

	getJobArray() {
		return [
			this.getSceneId(),
			this.getDescription(),
			this.getAttachments(),
			this.getAttributes(),
			this.getRequiredRoles(),
			this.getDeadline(),
			this.getStatus(),
		];
	}

	getCSVString() {
		return stringify([this.getJobArray()]).trimEnd();
	}

	getSceneId() {
		return this.scene_id == null ? 'N/A' : this.scene_id.toString();
	}
	getDescription() {
		return this.description == null ? 'N/A' : this.description.toString();
	}

	getAttachments() {
		return this.attachments == null ? 'N/A' : this.attachments.toString();
	}

	getAttributes() {
		return this.attributes == null ? 'N/A' : this.attributes.toString();
	}

	getRequiredRoles() {
		return this.required_roles == null ? 'N/A' : this.required_roles.toString();
	}

	getDeadline() {
		return this.deadline;
	}

	// Return a deadline in discord timestamp
	getDeadlineFormatted() {
		return discord.time(this.deadline);
	}

	getStatus() {
		return this.status.toString();
	}

	// Returns an array of Objects with name: and value: pair
	static getAvailableStatuses() {
		return this.available_statuses;
	}

	setSceneId(scene_id) {
		this.scene_id = scene_id.toString().toUpperCase();
	}

	setDescription(description) {
		this.description = description;
	}

	setAttachments(attachments) {
		this.attachments = attachments;
	}

	setAttributes(attributes) {
		this.attributes = attributes;
	}

	setRequiredRoles(required_roles) {
		this.required_roles = required_roles;
	}

	setDeadline(deadline) {
		this.deadline = chrono.parseDate(deadline);
	}

	// For correct values use Job.getAvailableStatuses()
	setStatus(status) {
		// try {
		for (const x of Job.available_statuses) {
			if (x.value == status) {
				this.status = status;
			}
		}
		if (this.status === undefined || this.status === null || this.status !== status) {
			throw new TypeError(`"${status}" is an invalid status`);
		}
		// }
		// catch (error) {
		// 	console.log(error + ': Error setting "' + status + '" as a status');
		// }
	}
}

module.exports = Job;

// console.log(Job.getAvailableStatuses());

// const anime = new Job("bruh", 1, 1, 1, 1, 1, 'COMPLETED');
// console.log(anime.getJobArray());
// console.log(anime.getCSVString());

// const audio = new Job(1, 1, 1, 1, 1, 1, 'bad stuff');

