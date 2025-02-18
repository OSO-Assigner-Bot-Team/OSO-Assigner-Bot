import { PrismaClient } from '@prisma/client'
// import * as database from './Entrypoint.js'

const prisma = new PrismaClient();

async function findJobBySceneID(){
	const allUsers = await prisma.job.findMany()
	console.log(allUsers)

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
	.then(async () => {
		findJobBySceneID()
			.then(async () => {
				await prisma.$disconnect()
			})
			.catch(async (e) => {
				console.error(e)
				await prisma.$disconnect()
			process.exit(1)
		})
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
	process.exit(1)
	})

