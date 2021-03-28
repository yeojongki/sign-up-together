import { defineComponent, reactive, ref } from 'vue'
import { Field, Form, Button } from 'vant'
import { LoginInfo } from '@/interfaces'

const Login = defineComponent({
  setup() {
    const loginInfo: LoginInfo = reactive({
      username: '',
      password: '',
    })

    const loading = ref(false)

    const onSubmit = (values: LoginInfo) => {
      loading.value = true
      console.log('submit', values)
      loading.value = false
    }

    return () => (
      <div class='min-h-screen flex flex-col items-center justify-center'>
        {/* <h1 class='mt-5 mb-5 text-xs'>Let's sign up together!</h1> */}

        <Form onSubmit={onSubmit}>
          <Field
            v-model={loginInfo.username}
            name='username'
            label='用户名'
            placeholder='用户名'
            rules={[{ required: true, message: '请填写用户名' }]}
          ></Field>
          <Field
            v-model={loginInfo.password}
            name='password'
            label='密码'
            placeholder='密码'
            rules={[{ required: true, message: '请填写密码' }]}
          ></Field>
          <div class='mt-2 mr-1 ml-1'>
            <Button round block loading={loading.value} type='primary' nativeType='submit'>
              登录
            </Button>
          </div>
        </Form>
      </div>
    )
  },
})

export default Login
