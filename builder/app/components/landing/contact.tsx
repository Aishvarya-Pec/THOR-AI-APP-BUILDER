import { Button } from "./button";
import { useLanguage } from "../../contexts/LanguageContext.client";

export const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem]">
            <span dangerouslySetInnerHTML={{ __html: t('contact.title') }} />
          </p>

          <Button containerClass="mt-10 cursor-pointer">{t('contact.button')}</Button>
        </div>
      </div>
    </section>
  );
};
