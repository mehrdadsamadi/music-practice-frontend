<template>
    <div>
        <slot v-bind="{time}"></slot>
    </div>
</template>

<script>
export default {
    name: "countDown",
    props: ["end"],
    data() {
        return {
            time: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            interval: null,
            countDownDate: new Date(this.end).getTime(),
            now: null,
            distance: null,
        }
    },
    created() {
        this.timeLeft()
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        setTimeLeft() {
            
            // Get today's date and time
            this.now = new Date().getTime();
            
            // Find the distance between now and the count down date
            this.distance = this.countDownDate - this.now;
            
            // Time calculations for days, hours, minutes and seconds
            this.time.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
            this.time.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.time.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
            this.time.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
            
            // If the count down is finished, write some text
            if (this.distance < 0) {
                clearInterval(this.interval);
                this.$emit("finish")
            }
        },
        timeLeft() {
            
            // this.countDownDate = new Date(this.end).getTime();
            
            if(this.end) {
                // Update the count down every 1 second
                this.interval = setInterval(this.setTimeLeft, 1000);

            }
        }
    },
}
</script>

<style>

</style>