<template>
    <header class="minimal-header">
        <div class="logo">
            <img src="@/assets/logo.png"  alt="Budget Manager Logo"/>
        </div>
    </header>
</template>

<script>
export default {
    name: "HeaderMinimal",
};
</script>

<style scoped>
.minimal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f9f9f9;
}

.logo img {
  max-width: 200px; 
  height: auto; 
}
</style>