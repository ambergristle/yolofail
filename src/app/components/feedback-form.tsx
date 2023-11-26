import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import wretch from 'wretch'
import { z } from 'zod'

import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/form";
import { Input } from "@/components/input";

const FeedbackValues = z.object({
  email: z.string().email(),
  message: z.string().min(500)
})

type FeedbackValues = z.infer<typeof FeedbackValues>;

const sendFeedbackRequest = async (payload: FeedbackValues) => {
  return wretch('/api/feedback')
    .post(payload)
    .json()
    .catch(console.error)
}

export const FeedbackForm = () => {

  const formProps = useForm({
    resolver: zodResolver(FeedbackValues),
    defaultValues: {
      email: '',
      message: '',
    },
  })

  const onSubmit = async (values: FeedbackValues) => {
    await sendFeedbackRequest(values)
  }

  return (
    <Dialog>
      <DialogTrigger>
        {'feedback'}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {'feedback form'}
          </DialogTitle>
        </DialogHeader>
        <Form {...formProps}>
        <form 
         className="space-y-8" 
          noValidate
          onSubmit={formProps.handleSubmit(onSubmit, console.error)}
          >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{'email'}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={'example@pm.me'} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{'feedback'}</FormLabel>
                <FormControl>
                  <Input placeholder={'i love this app!'} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">
            {'shout into the void'}
          </Button>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}