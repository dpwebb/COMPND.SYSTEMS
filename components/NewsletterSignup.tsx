import React, { useState, useId } from "react";
import { z } from "zod";
import { useForm } from "./Form";
import { Input } from "./Input";
import { Button } from "./Button";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";
import styles from "./NewsletterSignup.module.css";

const schema = z.object({
  email: z.string().email("Invalid frequency modulation (email)"),
});

export const NewsletterSignup = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const inputId = useId();
  const errorId = useId();

  const form = useForm({
    defaultValues: { email: "" },
    schema,
  });

  const onSubmit = (data: { email: string }) => {
    console.log("Newsletter subscription:", data);
    // Simulate API delay
    setTimeout(() => {
      setIsSuccess(true);
      toast.success("SUBSPACE CHANNEL OPEN", {
        description: "You have been added to the transmission list.",
      });
      form.setValues({ email: "" });
    }, 500);
  };

  if (isSuccess) {
    return (
      <div className={styles.successContainer} aria-live="polite">
        <CheckCircle className={styles.successIcon} aria-hidden="true" />
        <div className={styles.successText}>
          <span className={styles.successTitle}>TRANSMISSION ESTABLISHED</span>
          <span className={styles.successSub}>AWAITING INCOMING DATA</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSuccess(false)}
          className={styles.resetBtn}
          aria-label="Reset newsletter signup form"
        >
          RESET
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <Mail size={16} aria-hidden="true" />
        <label htmlFor={inputId}>RECEIVE TRANSMISSIONS</label>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputWrapper}>
          <Input
            id={inputId}
            placeholder="ENTER COMMS FREQUENCY (EMAIL)"
            value={form.values.email}
            onChange={(e) => form.setValues({ email: e.target.value })}
            className={styles.input}
            aria-invalid={!!form.errors.email}
            aria-describedby={form.errors.email ? errorId : undefined}
          />
        </div>
        <Button type="submit" className={styles.submitBtn}>
          SUBSCRIBE
        </Button>
      </form>
      {form.errors.email && (
        <div id={errorId} className={styles.error} role="alert">
          {String(form.errors.email)}
        </div>
      )}
    </div>
  );
};