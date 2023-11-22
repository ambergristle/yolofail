import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import wretch from 'wretch'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { getLocale } from './locale'

const locale = getLocale()

const FeedbackValues = z.object({
  email: z.string().email(),
  message: z.string().min(500)
})

type FeedbackValues = z.infer<typeof FeedbackValues>;

async function sendFeedbackRequest(payload: FeedbackValues) {
  return wretch('/api/feedback')
    .post(payload)
    .json()
    .catch(console.error)
}

export function FeedbackForm() {

  const formProps = useForm({
    resolver: zodResolver(FeedbackValues),
    defaultValues: {
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: FeedbackValues) {
    await sendFeedbackRequest(values)
  }

  return (
    <Dialog>
      <DialogTrigger>
        {locale.feedback}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {locale.feedbackForm}
          </DialogTitle>
        </DialogHeader>
        <form 
         className="space-y-8" 
          noValidate
          onSubmit={formProps.handleSubmit(onSubmit, console.error)}
          >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{locale.email}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={locale.emailPlaceholder} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{locale.feedback}</FormLabel>
                <FormControl>
                  <Input placeholder={locale.messagePlaceholder} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">
            {locale.send}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}