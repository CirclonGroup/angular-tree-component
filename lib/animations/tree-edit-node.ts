import { trigger, state, style, transition, animate } from '@angular/core';

export const inputAnimation = trigger(
      'showInputAnimation',[
        transition(':enter',[
          style({transform: 'scaleY(0)', opacity: 0, 'margin-top':'-20px'}),
          animate('350ms', style({transform: 'scaleY(1)', opacity: 1}))
        ]),
        transition(':leave',[
          style({transform: 'scaleY(1)', opacity: 1, 'margin-top':'-20px'}),
          animate('350ms', style({transform: 'scaleY(0)', opacity: 0}))
        ])
      ],
    );
export const nodeAnimation = trigger(
      'showNodeAnimation',[
        transition(':enter',[
          style({transform: 'scaleY(0)', opacity: 0}),
          animate('350ms', style({transform: 'scaleY(1)', opacity: 1}))
        ]),
        transition(':leave',[
          style({transform: 'scaleY(1)', opacity: 1}),
          animate('350ms', style({transform: 'scaleY(0)', opacity: 0}))
        ])
      ],
    );
  