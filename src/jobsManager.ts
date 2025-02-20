import { PrismaClient } from '@prisma/client'
import { JsonObject } from '@prisma/client/runtime/library';

import { Chrono } from 'chrono-node';
import { findJobBySceneID } from './databaseManager.js';



const chrono = new Chrono;
// const discord = require('discord.js');

// const prisma = new PrismaClient()



export type jobType = {
	sceneId: string | null;
	description: string | null;
	attachments: string | null;
	attributes: string | null;
	roles: string | null;
	deadline: Date | null;
	status: string | null;
	assignee: string | null;
	work: string | null;
}

class Job {

	/* Ideas for TODO
	* displayJob() returns something already formatted for discord
	* findScene(scene_id) returns a full array with found scene, should fail on duplicates, could be optimized down the line
	* check data integrity of the DATAFILE
	*
	* more useful documentation and comments
	* create unit tests
	*/
	
	_scene_id!: string | null;
	_description!: string | null;
	_attachments!: string | null;
	_attributes!: string | null;
	_roles!: string | null;
	_deadline!: Date | null;
	_status!: string | null;
	_assignee!: string | null;
	_work!: string | null;

	constructor(scene_id: string | null = null) {

		

		// if (!fs.existsSync(DATAFILE)) {
		// 	fs.appendFileSync(
		// 		DATAFILE,
		// 		'SceneId,Description,Attachments,Attributes,RequiredRoles,Deadline,Status,Assignee,Work\n',
		// 	);
		// }
		
		if (scene_id === null) {
			this._description = null;
			this._attachments = null;
			this._attributes = null;
			this._roles = null;
			this._deadline = null;
			this._status = null;
			this._assignee = null;
			this._work = null;
		}
		else {

			findJobBySceneID(scene_id).then(
				async (foundJob) => {
					// console.log(foundJob); //something is broken here
				}
			)



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

	setJob(scene:  jobType) {
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
			if (scene['sceneId'] != undefined) { this.setSceneId(scene['sceneId']);};
			if (scene['description'] != undefined) { this.setDescription(scene['description']);};
			if (scene['attachments'] != undefined) { this.setAttachments(scene['attachments']);};
			if (scene['attributes'] != undefined) { this.setAttributes(scene['attributes']);};
			if (scene['roles'] != undefined) { this.setRoles(scene['roles']);};
			if (scene['deadline'] != undefined) { this.setDeadline(scene['deadline']);};
			if (scene['status'] != undefined) { this.setStatus(scene['status']);};
			if (scene['assignee'] != undefined) { this.setAssignee(scene['assignee']);};
			if (scene['work'] != undefined) { this.setWork(scene['work']);};
		// }
	}

	getSceneId() {
		return this._scene_id == null ? 'N/A' : this._scene_id.toString();
	}
	getDescription() {
		return this._description == null ? 'N/A' : this._description.toString();
	}

	getAttachments() {
		return this._attachments == null ? 'N/A' : this._attachments.toString();
	}

	getAttributes() {
		return this._attributes == null ? 'N/A' : this._attributes.toString();
	}

	getRoles() {
		return this._roles == null ? 'N/A' : this._roles.toString();
	}

	getDeadline() {
		return this._deadline == null ? null : this._deadline.toISOString();
	}

	// Return a deadline in discord timestamp
	// getDeadlineFormatted() {
	// 	return this.deadline == null ? '**ERROR**' : discord.time(this.deadline);
	// }

	getStatus() {
		return this._status == null ? 'N/A' : this._status.toString();
	}

	getAssignee() {
		return this._assignee == null ? 'N/A' : this._assignee.toString();
	}

	getWork() {
		return this._work == null ? 'N/A' : this._work.toString();
	}

	setSceneId(scene_id: string) {
		this._scene_id = scene_id.toString().toUpperCase();
	}

	setDescription(description: string) {
		this._description = description;
	}

	setAttachments(attachments: any) {
		this._attachments = attachments;
	}

	setAttributes(attributes: any) {
		this._attributes = attributes;
	}

	setRoles(roles: any) {
		this._roles = roles;
	}

	setDeadline(deadline: string | Date) {
		if (typeof deadline !== 'string'){
			this._deadline = deadline;
		}
		else {

		this._deadline = chrono.parseDate(deadline);

		if (Object.prototype.toString.call(this._deadline) === '[object Date]') {
			// it is a date
			// if (isNaN(this.deadline)) {
			// 	throw new TypeError(`"${deadline}" is not a valid date`);
			// }
		}
		else {
			throw new TypeError(`"${deadline}" is not a valid date`);
		}

		}
	}

	// For correct values use Job.getAvailableStatuses()
	setStatus(status: string) {
		for (const x of Job.available_statuses) {
			if (x.value == status) {
				this._status = status;
			}
		}
		if (this._status === undefined || this._status !== status) {
			throw new TypeError(`"${status}" is an invalid status`);
		}
	}

	setAssignee(assignee: string) {
		this._assignee = assignee;
	}

	setWork(work: string) {
		this._work = work;
	}
}

//error
export default {}= Job;

// console.log(Job.getAvailableStatuses());

const anime = new Job("A");
// console.log(anime.getJobArray());
// console.log(anime.getCSVString());

// const audio = new Job(1, 1, 1, 1, 1, 1, 'bad stuff');

// console.log(chrono.parseDate('tomorrow').toDateString());
// console.log(chrono.parseDate('tomorrow').toISOString());
// console.log(chrono.parseDate('tomorrow').toUTCString());



