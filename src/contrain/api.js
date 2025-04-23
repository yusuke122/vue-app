export const callApi = async ({ method, url, data = null, isXml = false }) => {
    showLoading()
    try {
      const headers = {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': isXml ? 'application/xml' : 'application/json',
      }
      const res = await axios({
        method,
        url: `${API_BASE}${url}`,
        data,
        headers,
      })
      if (res.status === 200) {
        showAlert()
      }
      return res.data
    } catch (err) {
      if (err.response && err.response.status === 500) {
        errorAlert()
      }
      throw err
    } finally {
      hideLoading()
    }
  }

export const login = async () => {
    showLoading()
    try {
      const res = await axios.post(`${API_BASE}/login`, {
        username: username.value,
        password: password.value
      })
      if (res.status === 200) {
        token.value = res.data.token
        sessionStorage.setItem('token', token.value)
        showAlert()
      }
    } catch (e) {
      if (e.response && e.response.status === 500) {
        errorAlert()
      } else {
        alert('ログイン失敗')
      }
    } finally {
      hideLoading()
    }
  }

  export const fetchProfile = async () => {
    loading.value = true
    authError.value = false
    profile.value = null
    showLoading()
    try {
      const res = await axios.get(`${API_BASE}/profile`, {
        headers: {
          Authorization: Bearer ${token.value}
        }
      })
      if (res.status === 200) {
        profile.value = res.data
        showAlert()
      }
    } catch (err) {
      if (err.response && err.response.status === 500) {
        errorAlert()
      } else {
        authError.value = true
      }
    } finally {
      loading.value = false
      hideLoading()
    }
  }