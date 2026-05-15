import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  useForm,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/Form";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";
import { LcarsPanel } from "../components/LcarsPanel";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import styles from "./contact.module.css";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const serviceInterest = searchParams.get("service");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: serviceInterest
        ? `Inquiry regarding: ${serviceInterest.toUpperCase()}`
        : "",
      message: "",
    },
    schema: contactSchema,
  });

  // Update subject if URL param changes
  useEffect(() => {
    if (serviceInterest) {
      form.setValues((prev) => ({
        ...prev,
        subject: `Inquiry regarding: ${serviceInterest.toUpperCase()}`,
      }));
    }
  }, [serviceInterest, form.setValues]);

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    // Simulate API call
    console.log("Form submitted:", data);
    toast.success("TRANSMISSION SUCCESSFUL", {
      description: "Your message has been logged in our communication subsystem.",
    });
    form.setValues({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Communications | COMPND.SYSTEMS</title>
        <meta name="description" content="Initiate contact protocols." />
      </Helmet>

      <div className={styles.pageHeader}>
        <h1 className={styles.title}>COMMUNICATIONS</h1>
        <div className={styles.decorLine} />
      </div>

      <div className={styles.grid}>
        <div className={styles.formColumn}>
          <LcarsPanel title="TRANSMISSION FORM" color="primary">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={styles.form}
              >
                <div className={styles.row}>
                  <FormItem name="name" className={styles.field}>
                    <FormLabel>IDENTITY</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ENTER FULL NAME"
                        value={form.values.name}
                        onChange={(e) =>
                          form.setValues((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem name="email" className={styles.field}>
                    <FormLabel>CONTACT FREQUENCY (EMAIL)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ENTER EMAIL ADDRESS"
                        value={form.values.email}
                        onChange={(e) =>
                          form.setValues((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>

                <FormItem name="company">
                  <FormLabel>AFFILIATION (OPTIONAL)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ENTER COMPANY NAME"
                      value={form.values.company}
                      onChange={(e) =>
                        form.setValues((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem name="subject">
                  <FormLabel>SUBJECT</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ENTER SUBJECT"
                      value={form.values.subject}
                      onChange={(e) =>
                        form.setValues((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem name="message">
                  <FormLabel>MESSAGE CONTENT</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ENTER MESSAGE DATA..."
                      rows={6}
                      value={form.values.message}
                      onChange={(e) =>
                        form.setValues((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <div className={styles.actions}>
                  <Button type="submit" size="lg" className={styles.submitBtn}>
                    <Send size={18} /> TRANSMIT
                  </Button>
                </div>
              </form>
            </Form>
          </LcarsPanel>
        </div>

        <div className={styles.infoColumn}>
          <LcarsPanel title="COORDINATES" color="secondary">
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <MapPin className={styles.infoIcon} />
                <div>
                  <h4>HEADQUARTERS</h4>
                  <p>Sector 001, Earth</p>
                  <p>Halifax, NS</p>
                  <p>Canada</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Mail className={styles.infoIcon} />
                <div>
                  <h4>SUBSPACE CHANNEL</h4>
                  <p>hello@compnd.systems</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <div>
                  <h4>AUDIO LINK</h4>
                  <p>1 (647) 612-7729</p>
                </div>
              </div>
            </div>
          </LcarsPanel>

          <LcarsPanel title="STATUS" color="accent">
            <div className={styles.statusPanel}>
              <div className={styles.statusRow}>
                <span>COMMUNICATIONS ARRAY</span>
                <span className={styles.online}>ONLINE</span>
              </div>
              <div className={styles.statusRow}>
                <span>RESPONSE TIME</span>
                <span>&lt; 24 HRS</span>
              </div>
              <div className={styles.statusRow}>
                <span>ENCRYPTION</span>
                <span>LEVEL 5</span>
              </div>
            </div>
          </LcarsPanel>
        </div>
      </div>
    </>
  );
}