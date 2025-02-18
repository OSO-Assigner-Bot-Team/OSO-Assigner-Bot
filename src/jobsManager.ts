import { PrismaClient } from '@prisma/client'
import { JsonObject } from '@prisma/client/runtime/library';

import { Chrono } from 'chrono-node';

const chrono = new Chrono;
// const discord = require('discord.js');

const prisma = new PrismaClient()


class Job {

	/* Ideas for TODO
	* displayJob() returns something already formatted for discord
	* findScene(scene_id) returns a full array with found scene, should fail on duplicates, could be optimized down the line
	* check data integrity of the DATAFILE
	*
	* more useful documentation and comments
	* create unit tests
	*/
	
	scene_id!: String | null;
	description!: String | null;
	attachments!: String | null;
	attributes!: String | null;
	roles!: String | null;
	deadline!: Date | null;
	status!: String | null;
	assignee!: String | null;
	work!: String | null;

	constructor(scene_id: String | null = null) {

		

		// if (!fs.existsSync(DATAFILE)) {
		// 	fs.appendFileSync(
		// 		DATAFILE,
		// 		'SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work\n',
		// 	);
		// }
		
		if (scene_id === null) {
			this.description = null;
			this.attachments = null;
			this.attributes = null;
			this.roles = null;
			this.deadline = null;
			this.status = null;
			this.assignee = null;
			this.work = null;
		}
		else {
			// IDK what to do here
			// const jobs = prisma.job.findFirst({
			// 	where: {
			// 		sceneId: scene_id,
			// 	},
		// });
			// this.setJob(jobs[0]);
			// console.log(jobs);
			// console.log(this.getJob());
		}

	}

	// C from CRUD
	createScene(scene_id: string, description = '', attachments = null, attributes = null, roles = null, deadline = '', status = '') {
		this.setSceneId(scene_id);
		this.setDescription(description);
		this.setAttachments(attachments);
		this.setAttributes(attributes);
		this.setRoles(roles);
		this.setDeadline(deadline);
		this.setStatus(status);
		// database stuff here
	}
	// R from CRUD

	// U from CRUD

	// D from CRUD


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
			this.getRoles(),
			this.getDeadline(),
			this.getStatus(),
			this.getAssignee(),
			this.getWork(),
		];
	}

	setJob(scene:  Object) {
		// if (Object.prototype.toString.call(scene) === '[object Array]') {
		// 	this.setSceneId(scene[0]);
		// 	this.setDescription(scene[1]);
		// 	this.setAttachments(scene[2]);
		// 	this.setAttributes(scene[3]);
		// 	this.setRequiredRoles(scene[4]);
		// 	this.setDeadline(scene[5]);
		// 	this.setStatus(scene[6]);
		// 	this.setAssignee(scene[7]);
		// 	this.setWork(scene[8]);
		// }
		// else {
			// SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work
			// This will work out if object has those properties and assign them.
			if (scene['SceneId'] != undefined) { this.setSceneId(scene['SceneId']);};
			if (scene['Description'] != undefined) { this.setDescription(scene['Description']);};
			if (scene['Attachments'] != undefined) { this.setAttachments(scene['Attachments']);};
			if (scene['Attributes'] != undefined) { this.setAttributes(scene['Attributes']);};
			if (scene['RequiredRoles'] != undefined) { this.setRequiredRoles(scene['RequiredRoles']);};
			if (scene['Deadline'] != undefined) { this.setDeadline(scene['Deadline']);};
			if (scene['Status'] != undefined) { this.setStatus(scene['Status']);};
			if (scene['Assignee'] != undefined) { this.setAssignee(scene['Assignee']);};
			if (scene['Work'] != undefined) { this.setWork(scene['Work']);};
		// }
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

	getRoles() {
		return this.roles == null ? 'N/A' : this.roles.toString();
	}

	getDeadline() {
		return this.deadline == null ? null : this.deadline.toISOString();
	}

	// Return a deadline in discord timestamp
	// getDeadlineFormatted() {
	// 	return this.deadline == null ? '**ERROR**' : discord.time(this.deadline);
	// }

	getStatus() {
		return this.status == null ? 'N/A' : this.status.toString();
	}

	getAssignee() {
		return this.assignee == null ? 'N/A' : this.assignee.toString();
	}

	getWork() {
		return this.work == null ? 'N/A' : this.work.toString();
	}

	setSceneId(scene_id: string) {
		this.scene_id = scene_id.toString().toUpperCase();
	}

	setDescription(description: string) {
		this.description = description;
	}

	setAttachments(attachments: any) {
		this.attachments = attachments;
	}

	setAttributes(attributes: any) {
		this.attributes = attributes;
	}

	setRoles(roles: any) {
		this.roles = roles;
	}

	setDeadline(deadline: string) {
		this.deadline = chrono.parseDate(deadline);

		if (Object.prototype.toString.call(this.deadline) === '[object Date]') {
			// it is a date
			// if (isNaN(this.deadline)) {
			// 	throw new TypeError(`"${deadline}" is not a valid date`);
			// }
		}
		else {
			throw new TypeError(`"${deadline}" is not a valid date`);
		}
	}

	// For correct values use Job.getAvailableStatuses()
	setStatus(status: string) {
		for (const x of Job.available_statuses) {
			if (x.value == status) {
				this.status = status;
			}
		}
		if (this.status === undefined || this.status !== status) {
			throw new TypeError(`"${status}" is an invalid status`);
		}
	}

	setAssignee(assignee: string) {
		this.assignee = assignee;
	}

	setWork(work: string) {
		this.work = work;
	}
}

//error
export default {}= Job;

// console.log(Job.getAvailableStatuses());

const anime = new Job("bruh");
// console.log(anime.getJobArray());
// console.log(anime.getCSVString());

// const audio = new Job(1, 1, 1, 1, 1, 1, 'bad stuff');

// console.log(chrono.parseDate('tomorrow').toDateString());
// console.log(chrono.parseDate('tomorrow').toISOString());
// console.log(chrono.parseDate('tomorrow').toUTCString());



