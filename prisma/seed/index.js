const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Companies = require('./data/company');

async function runSeeders() {
    await Promise.all(
        Companies.map(async x => {
            await prisma.company.upsert(
                {
                    where: { id: x.id },
                    update: {},
                    create: x
                }
            )
            
        })
    )
}


runSeeders()
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e);
        process.exit(-1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })