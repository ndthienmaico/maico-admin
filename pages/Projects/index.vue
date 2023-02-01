<template>
  <div class="container">
    <h1 class="text-center font-[800] text-2xl mb-4">PROJECTS</h1>

    <div v-for="project in data.projects" :key="project.id">
      <NuxtLink :to="`/projects/${project.id}`">
        <div
          class="mt-4 border p-4 rounded-lg justify-center mx-auto w-3/6 hover:bg-slate-50 hover:ring-2 hover:ring-green-500"
        >
          <h3 class="text-xl font-bold">{{ project.projectName }}</h3>
          <p>
            {{ project.address.ward }}, {{ project.address.district }},
            {{ project.address.city }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const query = gql`
  query projects {
    projects {
      address {
        street
        district
        city
        ward
      }
      pageInfors {
        title
        slug
      }
      id
      projectName
    }
  }
`;
const { data } = await useAsyncQuery(query);
</script>

<style lang="scss" scoped></style>
