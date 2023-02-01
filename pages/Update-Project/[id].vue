<template>
  <div class="">
    <div class="fixed right-0">
      <button @click="Cancel" class="bg-red-600 hover:bg-red-700">Hủy</button>
      <button @click="Save" class="bg-[#12b488]" type="submit">Lưu</button>
    </div>
    <div class="mt=4 w-10/12">
      <h2 class="text-3xl font-bold">
        Project Name: {{ project.projectName }}
      </h2>
      <input v-model="project.projectName" type="text" />
      <p class="font-bold">Địa chỉ:</p>
      <p>Phường:</p>
      <input v-model="project.address.ward" type="text" />
      <p>Quận:</p>
      <input v-model="project.address.district" type="text" />
      <p>Thành phố:</p>
      <input v-model="project.address.city" type="text" />

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
          <input v-model="project.price" type="number" /> triệu/m2
        </p>
        <p>
          <span>Diện tích:</span>
          <input v-model="project.acreage" type="number" /> ha
        </p>
        <p>
          <span>Chủ đầu tư: </span>
          <input v-model="project.investor.investorName" type="text" />
        </p>
        <p>
          <span>Số căn hộ:</span>
          <input v-model="project.numberOfApartments" type="number" />
          căn
        </p>
        <p>
          <span>Số tòa:</span>
          <input v-model="project.numberOfBuildings" type="number" />
        </p>
        <p>
          <span>Pháp lý:</span>
          <input v-model="project.juridical" type="text" />
        </p>
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
import { useToast } from "vue-toastification";
const toast = useToast();
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

const router = useRouter();
const Cancel = () => {
  router.back();
};
const Save = () => {
  const UpdateProject = gql`
    mutation updateProject($input: UpdateProjectInput!) {
      updateProject(input: $input) {
        string
      }
    }
  `;
  const variables = {
    input: {
      acreage: project.acreage,
      address: {
        district: project.address.district,
        ward: project.address.ward,
        city: project.address.city,
      },
      //   description: project.description,
      //   drawings: {},
      //   forRentSEOContent: project.forRentSEOContent,
      //   forSellSEOContent: project.forSellSEOContent,
      id: project.id,
      //   images: project.images,
      //   investor: {
      //     investorName: project.investor.investorName,
      //   },
      //   investorId: project.investorId,
      juridical: project.juridical,
      //   masterPlan: project.masterPlan,
      numberOfApartments: project.numberOfApartments,
      numberOfBuildings: project.numberOfBuildings,
      //   pageInfors: project.pageInfors,
      price: project.price,
      projectName: project.projectName,
      projectPost: project.projectPost,
      //   tempProjectInfors: project.tempProjectInfors,
      //   utilities: project.utilities,
    },
  };
  const { mutate, onDone } = useMutation(UpdateProject, variables);
  mutate(variables);
  onDone(() => {
    const router = useRouter();
    toast.success("Đã cập nhật dự án");
    router.back();
  });
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
input {
  padding: 0.25rem;
  border-width: 1px;
  width: 60%;
  border-style: outset;
  border-radius: 5px;
}
input[type="text"]:disabled {
  background: #f2f2f2;
  color: gray;
}
input:focus {
  border-color: greenyellow;
}
</style>
