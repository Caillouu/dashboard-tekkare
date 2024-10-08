<script setup lang="ts">
  import hospitalData from '@/assets/data/hospitals.json'
  import Combobox from '@/components/Combobox.vue'
  import DonutCircleChart from '~/components/DonutCircleChart.vue';
  import SimpleBarChart from '~/components/SimpleBarChart.vue';
  import { ref, computed } from 'vue'
  import PieProgressChart from '~/components/PieProgressChart.vue';
  import AreaYearChart from '~/components/AreaYearChart.vue';
  import { Hospital, CornerRightUp, UsersRound, Stethoscope, Activity, Calendar, CalendarClock, Dna } from 'lucide-vue-next'
  import Badge from '~/components/ui/badge/Badge.vue';
  import { ScrollArea } from '@/components/ui/scroll-area'

  interface Hospital {
    id: number
    location: string
    overview: {
      satisfactionRate: number
      numberOfDoctors: number
      numberOfNurses: number
      totalPatients: number
      totalTreatments: number
    }
    doctorSpecialties: any[]
    hospitalDepartments: any[]
    clinicalTrials: any[]
    monthlyHospitalizations: any[]
  }

  definePageMeta({
    layout: 'dashboard',
  })

  const hospitals = ref(hospitalData)
  const selectedHospital = ref<Hospital | null>(null)

  const showOnlyInProgress = ref(false)

  function onSelectHospital(hospital: any) {
    selectedHospital.value = hospital
  }

  const filteredTrials = computed(() => {
    if (!selectedHospital.value) {
      return []
    }
    return showOnlyInProgress.value
      ? selectedHospital.value.clinicalTrials.filter(trial => trial.status === 'En cours')
      : selectedHospital.value.clinicalTrials
  })

  const toggleFilter = () => {
    showOnlyInProgress.value = !showOnlyInProgress.value
  }

</script>

<template>
  <div class="flex-1 p-4 pt-6 lg:p-8">
    <div class="pb-8 lg:flex">
      <div class="items-center md:flex">
        <h1 class="text-xl font-bold mr-4 lg:text-3xl">{{ $t('Dashboard') }}</h1>
        <div class="relative">
          <Combobox :hospitals="hospitals" @select-hospital="onSelectHospital" />
          <div v-if="!selectedHospital" class="absolute top-full w-full mt-4 md:right-16">
            <Badge><div class="w-full">{{ $t('SelectHospital') }}</div> <CornerRightUp class="h-3 ml-1" /></Badge>
          </div>
        </div>
      </div>
      <div v-if="selectedHospital" class="items-center flex-1 mt-4 lg:mt-0 md:flex">
        <div class="flex items-center lg:ml-6">
          <Hospital class="w-6 h-6" />
          <p class="ml-4 mt-auto text-s">({{ selectedHospital.location }})</p>
        </div>
        <div class="ml-auto mt-8 md:mt-0">
          <div class="text-xs text-center w-32">{{ $t('SatisfactionLevel') }}</div>
          <div class="flex items-center space-x-2">
            <SimpleBarChart :level="selectedHospital.overview.satisfactionRate.toString()" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedHospital">
      <div class="inline-grid grid-cols-12 gap-4 w-full">
          <Card class="col-span-12 h-auto lg:col-span-3 md:col-span-6">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle class="text-center"><h2>{{ $t('Employees') }}</h2></CardTitle>
              <Stethoscope class="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="flex justify-center">
                <DonutCircleChart
                  :key="selectedHospital.id"
                  :data="[
                    { label: $t('Doctors'), value: selectedHospital.overview.numberOfDoctors },
                    { label: $t('Nurses'), value: selectedHospital.overview.numberOfNurses }
                  ]"
                />
              </div>
            </CardContent>
          </Card>
          <Card class="col-span-12 h-auto lg:col-span-3 md:col-span-6">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle class="text-center"><h2>{{ $t('Patients') }}</h2></CardTitle>
              <UsersRound class="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="flex justify-center">
                <DonutCircleChart
                  :key="selectedHospital.id"
                  :data="[
                    { label: $t('WithoutTreatments'), value: selectedHospital.overview.totalPatients - selectedHospital.overview.totalTreatments },
                    { label: $t('Treatments'), value: selectedHospital.overview.totalTreatments }
                  ]"
                />
              </div>
            </CardContent>
          </Card>
          <Card class="col-span-12 lg:col-span-6 h-auto">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle><h2>{{ $t('DoctorSpecialties') }}</h2></CardTitle>
              <Activity class="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <PieProgressChart
                :key="selectedHospital.id"
                :data="selectedHospital.doctorSpecialties"
              />
            </CardContent>
          </Card>
          <Card class="col-span-12 lg:row-start-3 lg:row-end-4 lg:col-span-6">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle><h2>{{ $t('HospitalDepartments') }}</h2></CardTitle>
              <CalendarClock class="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-right text-xs">{{ $t('AverageWaitTime') }}</div>
              <ScrollArea type="always" class="h-[220px] w-full lg:h-[150px]">
                <div class="space-y-8">
                  <div v-for="dept in selectedHospital.hospitalDepartments" :key="dept.department" class="space-y-8">
                    <div class="flex items-center">
                      <div class="h-9 w-9 relative bg-slate-200 rounded-full">
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs uppercase font-semibold">{{Array.from(dept.department)[0] }}</div>
                      </div>
                      <div class="ml-4 space-y-1">
                        <p class="text-sm font-medium leading-none">
                          {{ dept.department }}
                        </p>
                        <p class="text-sm text-muted-foreground">
                          {{ dept.patientsPerDay }} {{ $t('PatientsPerDay') }}
                        </p>
                      </div>
                      <div class="ml-auto mr-6 font-medium">
                        {{ dept.averageWaitTime }}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card class="col-span-12 lg:row-start-2 lg:row-end-3 lg:col-span-6">
            <CardHeader class="relative flex flex-col items-start justify-between space-y-0 pb-6 md:flex-row md:items-center">
              <CardTitle><h2>{{ $t('ClinicalTrials') }}</h2></CardTitle>
              <div class="flex items-center ml-auto md:mr-6">
                <span class="text-xs mr-2">{{ $t('FilterOnly') }}</span>
                <button @click="toggleFilter"><Badge :variant="showOnlyInProgress ? 'default' : 'secondary'">{{ $t('InProgress') }}</Badge></button>
              </div>
              <Dna class="w-5 h-5 text-muted-foreground absolute right-6 top-6 md:relative md:top-auto md:right-auto" />
            </CardHeader>
            <CardContent>
              <ScrollArea type="always" class="h-[220px] w-full lg:h-[150px]">
                <div class="space-y-8">
                  <div v-for="trial in filteredTrials" :key="trial.name" class="space-y-8">
                    <div class="flex items-center">
                      <div class="h-9 w-9 relative bg-slate-200 rounded-full">
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs uppercase font-semibold">
                          {{Array.from(trial.name)[0] }}
                        </div>
                      </div>
                      <div class="ml-4 space-y-1">
                        <p class="text-sm font-medium leading-none">
                          {{ trial.name }}
                        </p>
                        <p class="flex items-center text-sm text-muted-foreground">
                          <Calendar class="w-3 h-3 mr-1 text-muted-foreground" />
                          <span>{{ trial.startDate }} - {{ trial.endDate }}</span>
                        </p>
                        <p class="text-sm text-muted-foreground">
                          {{ trial.totalPatients }} {{ $t('patients') }}
                        </p>
                      </div>
                      <div class="ml-auto mr-6 font-medium">
                        <Badge v-if="trial.status === 'En cours'" variant="secondary">{{ trial.status }}</Badge>
                        <Badge v-else variant="outline">{{ trial.status }}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card class="col-span-12 lg:row-start-2 lg:row-end-4 lg:col-span-6">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle><h2>{{ $t('MonthlyHospitalizations') }}</h2></CardTitle>
              <Calendar class="w-5 h-5 text-muted-foreground" />
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
  </div>
</template>