import * as React from "react";
import { Link } from "react-router-dom";
import { Building2, Factory, ShoppingCart } from "lucide-react";

export default function IndustriesSection() {
  return (
    <section className="py-20 bg-onealgo-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
            Specialized technology solutions designed for your industry's unique
            challenges and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/industries/construction" className="group">
            <div className="text-center p-6 rounded-lg border-2 border-transparent hover:border-onealgo-orange-500 transition-colors cursor-pointer">
              <Building2 className="w-16 h-16 text-onealgo-blue-950 mx-auto mb-4 group-hover:text-onealgo-orange-500 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-onealgo-blue-950 group-hover:text-onealgo-orange-500 transition-colors">
                Construction
              </h3>
            </div>
          </Link>

          <Link to="/industries/manufacturing" className="group">
            <div className="text-center p-6 rounded-lg border-2 border-transparent hover:border-onealgo-orange-500 transition-colors cursor-pointer">
              <Factory className="w-16 h-16 text-onealgo-blue-950 mx-auto mb-4 group-hover:text-green-500 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-onealgo-blue-950 group-hover:text-green-500 transition-colors">
                Manufacturing
              </h3>
            </div>
          </Link>

          <Link to="/industries/ecommerce" className="group">
            <div className="text-center p-6 rounded-lg border-2 border-transparent hover:border-onealgo-orange-500 transition-colors cursor-pointer">
              <ShoppingCart className="w-16 h-16 text-onealgo-blue-950 mx-auto mb-4 group-hover:text-green-500 transition-colors duration-300" />
              <h3 className="text-lg font-semibold text-onealgo-blue-950 group-hover:text-green-500 transition-colors">
                E-Commerce
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
