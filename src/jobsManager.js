// Data format validation should also be done here.
const fs = require('node:fs');
const { stringify, parse } = require('csv/sync');
const chrono = require('chrono-node');
const discord = require('discord.js');

const DATAFILE = 'jobs.v0.csv';

// This is redundant
if (!fs.existsSync(DATAFILE)) {
	fs.appendFileSync(
		DATAFILE,
		'SceneId,Description,Attachments,Attributes,Deadline,Status,Assignee,Work\n',
	);
}


class Job {

	/* Ideas for TODO
	* findScene(scene_id) returns a full array with found scene, should fail on duplicates, could be optimized down the line
	* check data integrity of the DATAFILE
	*
	* more useful documentation and comments
	* create unit tests
	*
	* use objects instead of arrays
	*/

	constructor(scene_id = null) {
		if (!fs.existsSync(DATAFILE)) {
			fs.appendFileSync(
				DATAFILE,
				'SceneId,Description,Attachments,Attributes,Deadline,Status,Assignee,Work\n',
			);
		}

		// function hasDuplicates(array) {
		// 	var valuesSoFar = Object.create(null);
		// 	for (var i = 0; i < array.length; ++i) {
		// 		var value = array[i];
		// 		if (value in valuesSoFar) {
		// 			return true;
		// 		}
		// 		valuesSoFar[value] = true;
		// 	}
		// 	return false;
		// }

		if (scene_id === null || scene_id === undefined) {
			this.scene_id = null;
			this.description = null;
			this.attachments = null;
			this.attributes = null;
			this.deadline = null;
			this.status = null;
			this.assignee = null;
			this.work = null;
		}
		else {
			this.findScene(scene_id);
		}

	}

	addJob(scene_id, description = null, attachments = null, attributes = null, deadline = null, status = null) {
		this.setSceneId(scene_id);
		this.setDescription(description);
		this.setAttachments(attachments);
		this.setAttributes(attributes);
		this.setDeadline(deadline);
		this.setStatus(status);
	}

	static available_statuses = [
		{ name: 'Completed', value: 'COMPLETED' },
		{ name: 'In Progress', value: 'IN_PROGRESS' },
		{ name: 'Unassigned', value: 'UNASSIGNED' },
	];

	findScene(scene_id) {
		const jobs = parse(fs.readFileSync(DATAFILE), { columns: true, objname: 'SceneId' });
		// console.log(jobs);
		if (Object.prototype.hasOwnProperty.call(jobs, scene_id)) {
			// console.log(jobs[scene_id]);
			this.setJob(jobs[scene_id]);
		}
		else {
			throw new TypeError(`There is no scene named "${scene_id}" in "${DATAFILE}"`);
		}
	}

	getJob() {
		return [
			this.getSceneId(),
			this.getDescription(),
			this.getAttachments(),
			this.getAttributes(),
			this.getDeadline(),
			this.getStatus(),
			this.getAssignee(),
			this.getWork(),
		];
	}

	setJob(scene) {
		if (Object.prototype.toString.call(scene) === '[object Array]') {
			this.setSceneId(scene[0]);
			this.setDescription(scene[1]);
			this.setAttachments(scene[2]);
			this.setAttributes(scene[3]);
			this.setDeadline(scene[4]);
			this.setStatus(scene[5]);
			this.setAssignee(scene[6]);
			this.setWork(scene[7]);
		}
		else {
			// SceneId,Description,Attachments,Attributes,Deadline,Status,Assignee,Work
			// This will work out if object has those properties and assign them.
			if (scene['SceneId'] != undefined) { this.setSceneId(scene['SceneId']);};
			if (scene['Description'] != undefined) { this.setDescription(scene['Description']);};
			if (scene['Attachments'] != undefined) { this.setAttachments(scene['Attachments']);};
			if (scene['Attributes'] != undefined) { this.setAttributes(scene['Attributes']);};
			if (scene['Deadline'] != undefined) { this.setDeadline(scene['Deadline']);};
			if (scene['Status'] != undefined) { this.setStatus(scene['Status']);};
			if (scene['Assignee'] != undefined) { this.setAssignee(scene['Assignee']);};
			if (scene['Work'] != undefined) { this.setWork(scene['Work']);};
		}
	}

	getCSVString() {
		return stringify([this.getJob()]);
	}

	// Returns an array of Objects with name: and value: pair
	static getAvailableStatuses() {
		return this.available_statuses;
	}

	// =========================================================
	// =========================GETTERS=========================
	// =========================================================

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

	// =========================================================
	// =========================SETTERS=========================
	// =========================================================

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

// const anime = new Job('B');
// anime.findScene('A');
// anime.setJob({Description: 'foo',SceneId: 'B'});
// console.log(anime.getJob());


// console.log(anime.getCSVString());

// const audio = new Job(1, 1, 1, 1, 1, 1, 'bad stuff');

// console.log(chrono.parseDate('tomorrow').toDateString());
// console.log(chrono.parseDate('tomorrow').toISOString());
// console.log(chrono.parseDate('tomorrow').toUTCString());
