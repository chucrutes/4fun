<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex justify-center sticky top-0 z-50 bg-primary h-32">
      <h1>Header area guest</h1>
    </header>
    <main class="flex flex-col flex-1 p-4 bg-gray-300">
      <RouterView />
    </main>
    <footer class="flex justify-center h-32 bg-primary">
      <h1>Footer area</h1>
    </footer>
  </div>
</template>
