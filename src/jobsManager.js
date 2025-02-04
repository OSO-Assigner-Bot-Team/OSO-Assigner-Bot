// Data format validation should also be done here.
const fs = require('node:fs');
const { stringify, parse } = require('csv/sync');
const chrono = require('chrono-node');
const discord = require('discord.js');

const DATAFILE = 'jobs.v0.csv';

if (!fs.existsSync(DATAFILE)) {
	fs.appendFileSync(
		DATAFILE,
		'SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work\n',
	);
}


class Job {

	constructor(scene_id = null) {
		if (!fs.existsSync(DATAFILE)) {
			fs.appendFileSync(
				DATAFILE,
				'SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work\n',
			);
		}
		if (scene_id === null || scene_id === undefined) {
			this.scene_id = null;
			this.description = null;
			this.attachments = null;
			this.attributes = null;
			this.required_roles = null;
			this.deadline = null;
			this.status = null;
			this.assignee = null;
			this.work = null;
		}
		else {
			const jobs = parse(fs.readFileSync(DATAFILE));
			// console.log(jobs);
			for (const i in jobs) {
				if (Object.prototype.hasOwnProperty.call(jobs, i)) {
					if (scene_id === jobs[i][0]) {
						this.setJob(jobs[i]);
					}
				}
			}
		}

	}


	addJob(scene_id, description = null, attachments = null, attributes = null, required_roles = null, deadline = null, status = null) {
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

	getJob() {
		return [
			this.getSceneId(),
			this.getDescription(),
			this.getAttachments(),
			this.getAttributes(),
			this.getRequiredRoles(),
			this.getDeadline(),
			this.getStatus(),
			this.getAssignee(),
			this.getWork(),
		];
	}

	setJob(scene = Array(9)) {
		this.setSceneId(scene[0]);
		this.setDescription(scene[1]);
		this.setAttachments(scene[2]);
		this.setAttributes(scene[3]);
		this.setRequiredRoles(scene[4]);
		this.setDeadline(scene[5]);
		this.setStatus(scene[6]);
		this.setAssignee(scene[7]);
		this.setWork(scene[8]);
	}

	getCSVString() {
		return stringify([this.getJob()]);
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
		return this.deadline.toISOString();
	}

	// Return a deadline in discord timestamp
	getDeadlineFormatted() {
		return this.deadline == null ? '**ERROR**' : discord.time(this.deadline);
	}

	getStatus() {
		return this.status == null ? 'N/A' : this.status.toString();
	}

	getAssignee() {
		return this.assignee == null ? 'N/A' : this.assignee.toString();
	}

	getWork() {
		return this.work == null ? 'N/A' : this.work.toString();
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

		if (Object.prototype.toString.call(this.deadline) === '[object Date]') {
			// it is a date
			if (isNaN(this.deadline)) {
				throw new TypeError(`"${deadline}" is not a valid date`);
			}
		}
		else {
			throw new TypeError(`"${deadline}" is not a valid date`);
		}
	}

	// For correct values use Job.getAvailableStatuses()
	setStatus(status) {
		for (const x of Job.available_statuses) {
			if (x.value == status) {
				this.status = status;
			}
		}
		if (this.status === undefined || this.status !== status) {
			throw new TypeError(`"${status}" is an invalid status`);
		}
	}

	setAssignee(assignee) {
		this.assignee = assignee;
	}

	setWork(work) {
		this.work = work;
	}
}

module.exports = Job;

// console.log(Job.getAvailableStatuses());

// const anime = new Job("bruh", 1, 1, 1, 1, 1, 'COMPLETED');
// console.log(anime.getJobArray());
// console.log(anime.getCSVString());

// const audio = new Job(1, 1, 1, 1, 1, 1, 'bad stuff');

// console.log(chrono.parseDate('tomorrow').toDateString());
// console.log(chrono.parseDate('tomorrow').toISOString());
// console.log(chrono.parseDate('tomorrow').toUTCString());
