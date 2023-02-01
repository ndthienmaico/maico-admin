<template>
  <div class="">
    <div class="fixed right-0">
      <NuxtLink to="/projects">
        <button class="bg-[#12b488]" @click="Back">Trở về</button>
      </NuxtLink>
      <button class="bg-sky-500" @click="Update">Chỉnh sửa</button>
    </div>
    <div class="mt=4 w-10/12">
      <h2 class="text-3xl font-bold">{{ project.projectName }}</h2>
      <p>
        {{ project.address.ward }}, {{ project.address.district }},
        {{ project.address.city }}
      </p>
      <h3 class="text-xl font-bold mt-4">Ảnh:</h3>
      <div class="flex gap-4">
        <div v-for="i in project.images.length" :key="i" class="w-full">
          <img :src="project.images[i]" />
        </div>
      </div>

      <h3 class="text-xl font-bold mt-4 mb-2">Tổng quan:</h3>
      <div class="grid grid-cols-2 gap-4 border px-3 py-2 font-semibold">
        <p>
          <span>Giá: </span>
          {{ project.price }} triệu/m2
        </p>
        <p><span>Diện tích:</span> {{ project.acreage }} ha</p>
        <p>
          <span>Chủ đầu tư: </span>
          {{ project.investor.investorName }}
        </p>
        <p><span>Số căn hộ:</span> {{ project.numberOfApartments }} căn</p>
        <p><span>Số tòa:</span> {{ project.numberOfBuildings }}</p>
        <p><span>Pháp lý:</span> {{ project.juridical }}</p>
      </div>

      <h3 class="text-xl font-bold mt-4">Thông tin chi tiết:</h3>
      <div class="grid grid-cols-2 gap-4 border px-3 py-2 font-semibold">
        <p><span>Giá:</span> {{ project.price }} triệu/m2</p>
        <p><span>Diện tích:</span> {{ project.acreage }} ha</p>
        <p><span>Chủ đầu tư:</span> {{ project.investor.investorName }}</p>
        <p><span>Số căn hộ:</span> {{ project.numberOfApartments }} căn</p>
        <p><span>Số tòa:</span> {{ project.numberOfBuildings }}</p>
        <p><span>Pháp lý:</span> {{ project.juridical }}</p>
        <div v-for="infor in project.tempProjectInfors" :key="infor.inforName">
          <p>
            <span>{{ infor.inforName }}:</span> {{ infor.inforContent }}
          </p>
        </div>
      </div>

      <h3 class="text-xl font-bold mt-4">Diện tích nội khu:</h3>
      <div class="grid grid-cols-2 gap-4 border px-3 py-2 font-semibold">
        <div v-for="list in project.utilities.listOfUtilities" :key="list">
          <p>{{ list }}</p>
        </div>
      </div>

      <h3 class="text-xl font-bold mt-4">Chủ đầu tư:</h3>
      <div class="grid grid-cols-2 gap-4 border px-3 py-2 font-semibold">
        <p class="font-bold">{{ project.investor.investorName }}</p>
        <p><span>Số dự án:</span> {{ project.investor.numberOfProjects }}</p>
        <p><span>Thành lập:</span> {{ project.investor.foundedTime }}</p>
        <p><span>Số điện thoại:</span> {{ project.investor.phoneNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id;

const getProject = gql`
  query projects($input: ProjectCollectionFilterInput) {
    projects(where: $input) {
      acreage
      address {
        street
        district
        city
        province
        ward
        commune
        googleMapLocation
        apiLocationString
      }
      description
      designDrawings {
        drawingTitle
        drawingPath
      }
      detailPostCanonicalLink {
        buyPostLink
        rentPostLink
      }
      forRentSEOContent
      forSellSEOContent
      id
      images
      investor {
        investorName
        image
        phoneNumber
        numberOfProjects
        foundedTime
      }
      investorId
      juridical
      masterPlan
      numberOfApartments
      numberOfBuildings
      pageInfors {
        title
        slug
      }
      price
      projectName
      projectPost
      tempProjectInfors {
        inforName
        inforContent
      }
      utilities {
        locationUtilities
        internalUtilities
        listOfUtilities
      }
    }
  }
`;
const variables = {
  input: {
    id: { eq: id },
  },
};
const { data } = await useAsyncQuery(getProject, variables);
var project = data.value.projects[0];

const { $formatDate } = useNuxtApp();
onMounted(() => {
  project.investor.foundedTime = $formatDate(project.investor.foundedTime);
});

const Update = () => {
  const router = useRouter();
  router.push(`/update-project/${id}`);
};
</script>

<style lang="css" scoped>
button {
  margin: 10px 20px;
  padding: 2px 3px;
  width: 100px;
  border-radius: 5px;
  color: white;
}
button:hover {
  font-size: large;
}
span {
  color: gray;
}
</style>
