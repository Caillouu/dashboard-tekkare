<script setup lang="ts">
  import hospitalData from '@/assets/data/hospitals.json'
  import Combobox from '@/components/Combobox.vue'
  import DonutCircleChart from '~/components/DonutCircleChart.vue';
  import SimpleBarChart from '~/components/SimpleBarChart.vue';
  import { ref } from 'vue'
  import PieProgressChart from '~/components/PieProgressChart.vue';
  import AreaYearChart from '~/components/AreaYearChart.vue';
  import { Heart, Hospital, CornerRightUp, UsersRound, Stethoscope, Activity, Calendar, CalendarClock, Dna } from 'lucide-vue-next'
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

  function onSelectHospital(hospital: any) {
    selectedHospital.value = hospital
  }

</script>

<template>
  <div class="flex-1 p-8 pt-6">
    <div class="flex items-center pb-8">
      <h1 class="text-3xl font-bold mr-4">Dashboard</h1>
      <div class="relative">
        <Combobox :hospitals="hospitals" @select-hospital="onSelectHospital" />
        <div v-if="!selectedHospital" class="absolute top-full right-16 mt-4">
          <Badge>Sélectionner un hôpital <CornerRightUp class="w-3 h-3 ml-1" /></Badge>
        </div>
      </div>
      <div v-if="selectedHospital" class="flex items-center ml-6">
        <Hospital class="w-6 h-6" />
        <p class="ml-4 mt-auto text-s">({{ selectedHospital.location }})</p>
      </div>
      <div v-if="selectedHospital" class="ml-auto">
        <div class="text-xs text-center w-32">Niveau de satisfaction</div>
        <div class="flex items-center space-x-2">
          <SimpleBarChart :level="selectedHospital.overview.satisfactionRate.toString()" />
          <Heart class="w-5 h-5 text-primary shrink-0" />
        </div>
      </div>
    </div>
    <div v-if="selectedHospital">
      <div class="grid grid-rows-3 md:grid-cols-5 lg:grid-cols-12 gap-4">
          <Card class="lg:col-span-3 h-auto">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle class="text-center"><h2>Employés</h2></CardTitle>
              <Stethoscope class="w-5 h-5 text-muted-foreground" />
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
          <Card class="lg:col-span-3 h-auto">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle class="text-center"><h2>Patients</h2></CardTitle>
              <UsersRound class="w-5 h-5 text-muted-foreground" />
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
          <Card class="lg:col-span-6 h-auto">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle><h2>Spécialités des médecins</h2></CardTitle>
              <Activity class="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <PieProgressChart
                :key="selectedHospital.id"
                :data="selectedHospital.doctorSpecialties"
              />
            </CardContent>
          </Card>
          <Card class="row-start-2 row-end-3 md:col-span-2 lg:col-span-6">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle><h2>Départements de l'hôpital</h2></CardTitle>
              <CalendarClock class="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-right text-xs">Temps d'attente moyen</div>
              <ScrollArea class="h-[180px] w-full">
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
                          {{ dept.patientsPerDay }} patients/jour
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
          <Card class="row-start-3 row-end-4 md:col-span-2 lg:col-span-6">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle><h2>Essais cliniques</h2></CardTitle>
              <Dna class="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <ScrollArea class="h-[180px] w-full">
                <div class="space-y-8">
                  <div v-for="trial in selectedHospital.clinicalTrials" :key="trial.name" class="space-y-8">
                    <div class="flex items-center">
                      <div class="h-9 w-9 relative bg-slate-200 rounded-full">
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs uppercase font-semibold">{{Array.from(trial.name)[0] }}</div>
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
                          {{ trial.totalPatients }} patients
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
          <Card class="row-start-2 row-end-4 lg:col-span-6">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle><h2>Hospitalisation mensuelles</h2></CardTitle>
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