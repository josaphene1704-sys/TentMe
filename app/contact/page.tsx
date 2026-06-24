"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// דף יצירת קשר: טופס לשליחת הודעות ופרטי התקשרות נוספים
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // biome-ignore lint/suspicious/noConsole: Demo purpose
    console.log("Contact form submitted:", formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-center font-bold text-5xl">צור קשר</h1>
        <p className="mb-16 text-center text-muted-foreground text-xl">
          נשמח לשמוע ממך! מלא את הטופס ונחזור אליך בהקדם
        </p>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">שלח לנו הודעה</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-2 block font-medium text-sm" htmlFor="name">
                      שם מלא *
                    </label>
                    <Input
                      className="py-5 text-lg"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      placeholder="השם המלא שלך"
                      required={true}
                      type="text"
                      value={formData.name}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-sm" htmlFor="email">
                      אימייל *
                    </label>
                    <Input
                      className="py-5 text-lg"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required={true}
                      type="email"
                      value={formData.email}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-sm" htmlFor="subject">
                      נושא *
                    </label>
                    <Input
                      className="py-5 text-lg"
                      id="subject"
                      name="subject"
                      onChange={handleChange}
                      placeholder="נושא הפנייה"
                      required={true}
                      type="text"
                      value={formData.subject}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-sm" htmlFor="message">
                      הודעה *
                    </label>
                    <textarea
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="message"
                      name="message"
                      onChange={handleChange}
                      placeholder="ספר לנו איך נוכל לעזור..."
                      required={true}
                      rows={6}
                      value={formData.message}
                    />
                  </div>

                  <Button className="w-full py-6 text-lg" size="lg" type="submit">
                    שלח הודעה
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="mb-6 font-bold text-3xl">פרטי התקשרות</h2>
              <p className="mb-8 text-muted-foreground">
                ניתן ליצור קשר איתנו גם באמצעות הערוצים הבאים:
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="mb-1 font-semibold">אימייל</h3>
                    <p className="text-muted-foreground">lamiscosmatics@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="mb-1 font-semibold">טלפון</h3>
                    <p className="text-muted-foreground">0522903783</p>
                    <p className="mt-1 text-muted-foreground text-sm">
                      ראשון - חמישי, XX:00 - XX:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 text-primary" />
                  <div>
                    <h3 className="mb-1 font-semibold">כתובת</h3>
                    <p className="text-muted-foreground">
                      רחוב הדוגמה 123
                      <br />
                      עיר, ישראל
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">זמני תגובה</h3>
                <p className="text-muted-foreground text-sm">
                  אנו שואפים להגיב לכל פניה תוך 24 שעות בימי עבודה. בסופי שבוע וחגים, זמני התגובה
                  עשויים להיות ארוכים יותר.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link className="text-primary hover:underline" href="/">
            ← חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}
