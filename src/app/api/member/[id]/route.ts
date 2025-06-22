export const POST = async () => {
  const cv = await prisma.curriculumVitae.findMany()

  const json = JSON.stringify(cv, null, 2)

  return new Response(json)
}
