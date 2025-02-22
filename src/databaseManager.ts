import { PrismaClient } from '@prisma/client'
import { jobType } from './jobsManager.js';
// import * as database from './Entrypoint.js'

const prisma = new PrismaClient();

export async function findJobBySceneID(scene_id: String){
	const job = await prisma.job.findMany()
	// console.log(job)
	return job
}

async function createJob() {
	await prisma.job.create(
		{
			data: {
				sceneId: 'A',
				description: 'did I do it?',
				attachments: {},
				attributes: {},
				roles: {},
				deadline: '2025-02-11T13:16:24.455Z'

			}

		}
	)



	
}

createJob()
	.then(
		// async () => {
		// findJobBySceneID()
		// 	.then(async () => {
		// 		await prisma.$disconnect()
		// 	})
		// 	.catch(async (e) => {
		// 		console.error(e)
		// 		await prisma.$disconnect()
		// 	process.exit(1)
		// })
		// await prisma.$disconnect()
	// }
)
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
	process.exit(1)
	})

