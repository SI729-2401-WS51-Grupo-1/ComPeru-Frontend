<script>
import {Notification} from "@/tracking/model/notifications/notification.entity.js";
import {NotificationsApiService} from "@/tracking/services/notifications/notifications-api.service.js";

export default {
  name: "notifications.component",
  title: "Notifications",
  data() {
    return {
      notifications: [],
      notificationService: null
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      console.log('created');
      this.notificationService = new NotificationsApiService();
      this.notificationService.getAll()
          .then(response => {
            this.notifications = response.data;
            this.notifications = this.notifications.map(
                (notification) => {
                  return Notification.toDisplayableNotification(notification)
                }
            );
            console.log(response.data);
          });
    }
  }
}
</script>

<template>
  <div class="nots-header gap-2 align-items-center justify-content-between">
    <span class="m-0">Notifications</span>
  </div>
  <div class="nots-container" v-for="notification in notifications">
    <pv-card :notification="notification">
      <template #content>
        <br>
        <p> Título: {{ notification.title }} </p>
        <p> Descripcion: {{ notification.description }} </p>
        <br>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>

</style>