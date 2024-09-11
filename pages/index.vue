<script setup lang="ts">
  import hospitalData from '@/assets/data/hospitals.json'
  import Combobox from '@/components/Combobox.vue'
  import DonutCircleChart from '~/components/DonutCircleChart.vue';
  import SimpleBarChart from '~/components/SimpleBarChart.vue';
  import { ref, computed, toRefs } from 'vue'
import TestComponent from '~/components/TestComponent.vue';
import PieProgressChart from '~/components/PieProgressChart.vue';
import AreaYearChart from '~/components/AreaYearChart.vue';


  definePageMeta({
    layout: 'dashboard',
  })

  const hospitals = ref(hospitalData)
  const selectedHospital = ref(null)

  function onSelectHospital(hospital) {
    selectedHospital.value = hospital
  }

</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center space-x-4 pb-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <Combobox :hospitals="hospitals" @select-hospital="onSelectHospital" />
      <p v-if="selectedHospital" class="ml-4 mt-auto text-s">({{ selectedHospital.location }})</p>
    </div>
    <div v-if="selectedHospital">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle class="text-center">Level of satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex justify-center">
                <div class="w-16 h-32">
                  <SimpleBarChart :level="selectedHospital.overview.satisfactionRate" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle class="text-center">Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex justify-center">
                <DonutCircleChart
                  :key="selectedHospital.id"
                  :data="[
                    { label: 'Doctors', value: selectedHospital.overview.numberOfDoctors },
                    { label: 'Nurses', value: selectedHospital.overview.numberOfNurses }
                  ]"
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle class="text-center">Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex justify-center">
                <DonutCircleChart
                  :key="selectedHospital.id"
                  :data="[
                    { label: 'Without treatments', value: selectedHospital.overview.totalPatients - selectedHospital.overview.totalTreatments },
                    { label: 'Treatments', value: selectedHospital.overview.totalTreatments }
                  ]"
                />
              </div>
            </CardContent>
          </Card>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spécialités des médecins</CardTitle>
          </CardHeader>
          <CardContent>
            <PieProgressChart
              :key="selectedHospital.id"
              :data="selectedHospital.doctorSpecialties"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hospitalisation mensuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaYearChart
              :key="selectedHospital.id"
              :data="selectedHospital.monthlyHospitalizations"
            />
          </CardContent>
        </Card>
      </div>
    </div>
    <!-- <TestComponent v-if="selectedHospital" :hospital="selectedHospital" /> -->
  </div>
</template>