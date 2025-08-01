<template>
  <div class="form-wrapper">
    <div class="card form-card shadow-lg">
      <h2 class="form-title mb-4">📸 Fotoğraf / Video Ekle</h2>

      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="mb-3">
          <label class="form-label">İsim</label>
          <input
            type="text"
            v-model="isim"
            class="form-control custom-input"
            placeholder="İsminizi girin"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Not</label>
          <textarea
            v-model="notText"
            class="form-control custom-input"
            rows="3"
            placeholder="Notunuzu yazın"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Resim veya Video Seç (Birden Fazla Seçebilirsiniz)</label>
          <input
            type="file"
            @change="onFilesChange"
            class="form-control custom-input"
            accept="image/*,video/*"
            multiple
            required
          />
        </div>

        <button
          type="submit"
          class="btn custom-btn w-100"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Yükleniyor...</span>
          <span v-else>Gönder</span>
        </button>
      </form>

      <div v-if="message" class="alert alert-info mt-4 text-center">
        {{ message }}
      </div>
    </div>

    <!-- Yükleme Spinner -->
    <div v-if="isSubmitting" class="spinner-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isim = ref('')
const notText = ref('')
const selectedFiles = ref([])
const message = ref('')
const isSubmitting = ref(false)

const onFilesChange = (event) => {
  selectedFiles.value = Array.from(event.target.files)
}

const submitForm = async () => {
  try {
    message.value = ''
    isSubmitting.value = true

    if (!isim.value || !notText.value) {
      message.value = 'İsim ve not girilmelidir.'
      isSubmitting.value = false
      return
    }

    if (selectedFiles.value.length === 0) {
      message.value = 'Lütfen en az bir resim veya video seçin.'
      isSubmitting.value = false
      return
    }

    const formData = new FormData()
    formData.append('isim', isim.value)
    formData.append('not_text', notText.value)
    selectedFiles.value.forEach(file => {
      formData.append('photo', file)
    })

    const res = await fetch('https://fruity-steaks-cheer.loca.lt/uploads', {
      method: 'POST',
      body: formData
    })

    const result = await res.json()

    if (!res.ok) {
      message.value = result.error || 'Hata oluştu'
    } else {
      message.value = result.message || 'Başarıyla gönderildi!'
      isim.value = ''
      notText.value = ''
      selectedFiles.value = []
    }
  } catch (err) {
    console.error(err)
    message.value = 'Sunucu hatası oluştu.'
  } finally {
    isSubmitting.value = false
  }
}
</script>


<style scoped>
body {
  background: linear-gradient(135deg, #ffe6f0, #ffe0f5);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 50px 20px;
  position: relative;
}

.form-card {
  width: 100%;
  max-width: 600px;
  background-color: #fff0f6;
  border-radius: 16px;
  padding: 30px;
  border: 1px solid #ffb3d9;
  box-shadow: 0 8px 20px rgba(255, 102, 163, 0.2);
}

.form-title {
  text-align: center;
  color: #cc0066;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  text-align: center;
  font-weight: 600;
  color: #cc0066;
  margin-bottom: 8px;
  user-select: none;
}

input.custom-input,
textarea.custom-input {
  display: block;
  margin: 0 auto;
  max-width: 90%;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #ffb3d9;
  padding: 10px 12px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input.custom-input:focus,
textarea.custom-input:focus {
  outline: none;
  border-color: #ff66a3;
  box-shadow: 0 0 6px #ff66a3aa;
}

.custom-btn {
  display: block;
  margin: 20px auto 0;
  width: 150px;
  background-color: #ff66a3;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  transition: background 0.3s ease;
  border-radius: 10px;
  cursor: pointer;
}

.custom-btn:hover {
  background-color: #e60073;
}

.alert {
  max-width: 90%;
  margin: 1.5rem auto 0;
  font-weight: 600;
  color: #cc0066;
  text-align: center;
}

/* Spinner overlay */
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Spinner style */
.spinner {
  width: 48px;
  height: 48px;
  border: 6px solid #ffb3d9;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>