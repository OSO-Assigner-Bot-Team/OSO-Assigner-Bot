

class Job {
	constructor(scene_id, description, attachments, attributes, required_roles, deadline, status) {
		// this.scene_id = scene_id;
		// this.description = description;
		// this.attachments = attachments;
		// this.attributes = attributes;
		// this.required_roles = required_roles;
		// this.deadline = deadline;
		// this.status = status;
	}
    //TODO 
    const available_statuses = ["COMPLETED","IN_PROGRESS","UNASSIGNED"]


	getSceneId() {
		return this.scene_id;
	}
    getDescription(){
        return this.description;
    }

    getAttachments(){
        return this.attachments;
    };

    geAttributes(){
        return this.attributes;
    };

    getRequired_roles(){
        return this.required_roles;
    };

    getDeadline(){
        return this.deadline;
    };

    getStatus(){
        return this.status;
    };

    getAvaiableStatuses(){
        return this.available_statuses;
    };

}