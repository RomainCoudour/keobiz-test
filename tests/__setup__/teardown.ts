export default async function teardown() {
  const testDataSource = globalThis.testDataSource;
  await testDataSource.dropDatabase();
  await testDataSource.destroy();
}
