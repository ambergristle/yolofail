import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export function FeedbackForm() {

  const formProps = useForm({
    defaultValues: {
      email: '',
      message: '',
    },
  })

  function onSubmit(values: { email: string; message: string }) {
    console.log(values)
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
      </DialogContent>
    </Dialog>
  )
}